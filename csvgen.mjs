import { faker } from '@faker-js/faker';
// or, if desiring a different locale
// import { fakerDE as faker } from '@faker-js/faker';
import { writeFileSync } from 'node:fs'

const randomName = faker.person.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

const headers = ["ConstituentID", "Constituent Email", "class year", "is admin"]

const data = []

for (let i = 0; i < 1000; i++) {
    data.push({
        [headers[0]]: faker.string.uuid(),
        [headers[1]]: faker.internet.email(),
        [headers[2]]: faker.date.anytime().getFullYear(),
        [headers[3]]: faker.datatype.boolean({ probability: 0.49 })
    })

    if (Math.random() < 0.15) {
        data[i][headers[0]] = faker.string.alphanumeric(7)
    }
    if (Math.random() < 0.15) {
        data[i][headers[1]] = faker.string.alphanumeric(11)
    }
    if (Math.random() < 0.15) {
        data[i][headers[2]] = faker.string.alphanumeric(16)
    }
    if (Math.random() < 0.15) {
        data[i][headers[3]] = faker.string.alphanumeric(13)
    }
}


const lines = data.map(obj =>
    headers.map(header => obj[header]).join(',')
)

const final = `${headers.join(',')}\n${lines.join('\n')}`

writeFileSync("data.csv", final)