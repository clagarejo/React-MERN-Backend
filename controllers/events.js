const { response } = require('express')
const Evento = require('../models/Evento')

const getEventos = async (req, res = response) => {

    const eventos = await Evento.find().populate('user', 'name')

    try {

        res.status(201).json({
            ok: true,
            eventos
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

const crearEvento = async (req, res = response) => {

    const evento = new Evento(req.body)

    try {


        evento.user = req.uid
        const eventoGuardado = await evento.save()

        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

const actualizarEvento = async (req, res = response) => {
    const eventoId = req.params.id
    const uid = req.uid
    
    try {
        const evento = await Evento.findById(eventoId)
        
        if (!evento) {
            res.status(404).json({
                ok: false,
                msg: 'No existe ningun evento relacionado con este id',
            })
        }
        
        
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene priviligio de editar este evento',
            })
        }
        
        const nuevoEvento = { 
            ...req.body,
            user: uid,
        }
        
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } )

        res.status(201).json({
            ok: true,
            evento: eventoActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}

const eliminarEvento = async (req, res = response) => {

    const eventoId = req.params.id
    const uid = req.uid

    try {

        const evento = await Evento.findById(eventoId)
        
        if (!evento) {
            res.status(404).json({
                ok: false,
                msg: 'No existe ningun evento relacionado con este id',
            })
        }
        
        
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene priviligio de eliminar este evento',
            })
        }

        await Evento.findByIdAndDelete( eventoId )


        res.status(201).json({
            ok: true,
            msg: 'El evento ha sido eliminado'
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }

}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}