const fs = require('fs')
const { Telegraf } = require('telegraf')
const axios = require('axios')
const { preCreate, superFile, createFile } = require('./middleware/upload')
require('dotenv').config()

const bot = new Telegraf('7970179128:AAEh0VxXvrto96U3njLhZExFjJOXxYK3Jnw')  // Use environment variable for the token

bot.start(async (ctx) => {
    ctx.reply(`Hai ${ctx.message.from.first_name}!\nAku bot arsip terhubung dengan Terabox Cloud yang siap mengamankan file kamu!\n\nSilahkan kirimkan file yang ingin disimpan!`)
})

bot.on('message', async (ctx) => {
    if (ctx.message.document) {
        const fileID = ctx.message.document.file_id
        const fileName = ctx.message.document.file_name

        try {
            // Mendapatkan URL file yang dikirim
            const fileLink = await bot.telegram.getFileLink(fileID)
            await ctx.reply('File berhasil diterima! Sedang mengunduh file...')

            // Mengunduh file menggunakan axios
            const response = await axios({
                method: 'get',
                url: fileLink,
                responseType: 'stream'  // Menggunakan stream untuk mengunduh file
            })

            // Menyimpan file yang diunduh menggunakan fs
            const filePath = `${fileName}`
            const writer = fs.createWriteStream(filePath)
            response.data.pipe(writer)

            // Wait for the file to be fully written before continuing
            writer.on('finish', async () => {
                await ctx.reply('File berhasil diunduh! Sedang mengunggah file ke Terabox...')

                try {
                    // Call the createFile function after the file is saved
                    await preCreate(filePath)  // Pass the path or other necessary parameters
                    ctx.reply(`File ${fileName} berhasil diunggah ke Terabox!`)

                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error('Error saat menghapus file:', err)
                            return
                        }
                        console.log('File berhasil dihapus:', filePath)
                    })

                } catch (uploadError) {
                    console.log('Error saat mengunggah file:', uploadError)
                    ctx.reply('Terjadi kesalahan saat mengunggah file ke Terabox!')
                }
            })

            writer.on('error', (err) => {
                console.log('Terjadi kesalahan saat menyimpan file:', err)
                ctx.reply('Terjadi kesalahan saat memproses file!')
            })

        } catch (err) {
            console.log('Error saat mengunduh atau menyimpan file:', err)
            ctx.reply('Terjadi kesalahan saat memproses file!')
        }
    }
})

bot.launch()
console.log('Bot is running...')
