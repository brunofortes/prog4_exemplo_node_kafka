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

const consumidor = kafka.consumer({groupId: 'test-group'})

const run =  async () => {
    await consumidor.connect()
    await consumidor.subscribe({topic: 'usrnamedaaplicacao-default', fromBeginning: true})

    await consumidor.run({
        eachMessage: async ({topic, partition, message}) => {
            console.log({
                partition, 
                offset: message.offset,
                mensagem: message.value.toString()
            })
        }
    })

}

run().catch(console.error)