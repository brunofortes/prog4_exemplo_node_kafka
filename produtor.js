const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    clientId: 'producer-teste-unoesc',
    brokers: ['tricycle-01.srvs.cloudkafka.com:9094'],
    ssl: true,
    sasl:{
        mechanism: 'SCRAM-SHA-256',
        username: 'usrnamedaaplicacao',
        password: 'abcd123456'
    }
})

const produtor = kafka.producer()

const run =  async () => {
    await produtor.connect()
    await produtor.send({
        topic: 'usrnamedaaplicacao-default',
        messages: [{
            value: "Mais uma mensagem"
        }]
    })
}

run().catch(console.error)