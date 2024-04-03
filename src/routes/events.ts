import { Router } from 'express';

const router = Router();

router.post('/events',(req, res) => res.send('hello world'));

router.get('/auth/events',(req, res) => res.send('hello world'));

router.get('/auth/events',(req, res) => res.send('hello world'));

router.put('/auth/events',(req, res) => res.send('hello world'));

router.delete('/auth/events',(req, res) => res.send('hello world'));

export default router;