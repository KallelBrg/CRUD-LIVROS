import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const PORT = 3000;

// 1. Criar um novo livro
app.post('/livros', async (req: Request, res: Response) => {
  const { titulo, autor, anoPublicacao, genero } = req.body;
  try {
    const novoLivro = await prisma.livro.create({
      data: { titulo, autor, anoPublicacao, genero },
    });
    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar livro.' });
  }
});

// 2. Listar todos os livros
app.get('/livros', async (_req: Request, res: Response) => {
  try {
    const livros = await prisma.livro.findMany();
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar livros.' });
  }
});

// 3. Atualizar um livro
app.put('/livros/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, autor, anoPublicacao, genero } = req.body;
  try {
    const livroAtualizado = await prisma.livro.update({
      where: { id: Number(id) },
      data: { titulo, autor, anoPublicacao, genero },
    });
    res.status(200).json(livroAtualizado);
  } catch (error) {
    res.status(404).json({ error: 'Livro não encontrado.' });
  }
});

// 4. Excluir um livro
app.delete('/livros/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.livro.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: 'Livro não encontrado.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
