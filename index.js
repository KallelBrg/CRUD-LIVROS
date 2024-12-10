const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// 1. Criar (Cadastrar um novo livro)
app.post("/livros", async (req, res) => {
  const { titulo, autor, anoPublicacao, genero } = req.body;

  try {
    const novoLivro = await prisma.livro.create({
      data: { titulo, autor, anoPublicacao, genero },
    });
    res.status(201).json(novoLivro);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar livro." });
  }
});

// 2. Listar (Exibir todos os livros)
app.get("/livros", async (req, res) => {
  try {
    const livros = await prisma.livro.findMany();
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar livros." });
  }
});

// 3. Atualizar (Editar informações de um livro)
app.put("/livros/:id", async (req, res) => {
  const { id } = req.params;
  const { titulo, autor, anoPublicacao, genero } = req.body;

  try {
    const livroAtualizado = await prisma.livro.update({
      where: { id: parseInt(id) },
      data: { titulo, autor, anoPublicacao, genero },
    });
    res.status(200).json(livroAtualizado);
  } catch (error) {
    res.status(404).json({ error: "Livro não encontrado." });
  }
});

// 4. Excluir (Remover um livro)
app.delete("/livros/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.livro.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Livro não encontrado." });
  }
});

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));