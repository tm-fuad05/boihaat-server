import { prisma } from "../src/config/prisma";

async function main() {
  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Science Fiction",
        slug: "science-fiction",
        createdAt: "2026-09-30T10:00:00.000Z",
        updatedAt: "2026-09-30T10:00:00.000Z",
      },
      {
        name: "Self Help",
        slug: "self-help",
        createdAt: "2026-09-30T10:05:00.000Z",
        updatedAt: "2026-09-30T10:05:00.000Z",
      },
      {
        name: "Programming & Tech",
        slug: "programming-tech",
        createdAt: "2026-09-30T10:10:00.000Z",
        updatedAt: "2026-09-30T10:10:00.000Z",
      },
    ],
  });
  console.log(categories);

  const sciFi = await prisma.category.findUnique({
    where: { slug: "science-fiction" },
  });
  const selfHelp = await prisma.category.findUnique({
    where: { slug: "self-help" },
  });
  const proTech = await prisma.category.findUnique({
    where: { slug: "programming-tech" },
  });

  const books = await prisma.book.createMany({
    data: [
      // --- Science Fiction (5 Books) ---
      {
        title: "Dune",
        price: 24.99,
        stock: 45,
        categoryId: sciFi!.id,
      },
      {
        title: "Project Hail Mary",
        price: 18.5,
        stock: 30,
        categoryId: sciFi!.id,
      },
      {
        title: "The Three-Body Problem",
        price: 19.99,
        stock: 25,
        categoryId: sciFi!.id,
      },
      {
        title: "Neuromancer",
        price: 14.75,
        stock: 40,
        categoryId: sciFi!.id,
      },
      {
        title: "Foundation",
        price: 16.5,
        stock: 35,
        categoryId: sciFi!.id,
      },
      // --- Self Help (5 Books) ---
      {
        title: "Atomic Habits",
        price: 15.99,
        stock: 120,
        categoryId: selfHelp!.id,
      },
      {
        title: "Deep Work",
        price: 14.2,
        stock: 50,
        categoryId: selfHelp!.id,
      },
      {
        title: "The Psychology of Money",
        price: 16.8,
        stock: 80,
        categoryId: selfHelp!.id,
      },
      {
        title: "Can't Hurt Me",
        price: 17.5,
        stock: 60,
        categoryId: selfHelp!.id,
      },
      {
        title: "Show Your Work!",
        price: 12.0,
        stock: 45,
        categoryId: selfHelp!.id,
      },
      // --- Programming & Tech (5 Books) ---
      {
        title: "Clean Code",
        price: 32.5,
        stock: 40,
        categoryId: proTech!.id,
      },
      {
        title: "You Don't Know JS Yet",
        price: 21.99,
        stock: 55,
        categoryId: proTech!.id,
      },
      {
        title: "The Pragmatic Programmer",
        price: 35.0,
        stock: 30,
        categoryId: proTech!.id,
      },
      {
        title: "Designing Data-Intensive Applications",
        price: 42.0,
        stock: 20,
        categoryId: proTech!.id,
      },
      {
        title: "Refactoring: Improving the Design of Existing Code",
        price: 38.5,
        stock: 25,
        categoryId: proTech!.id,
      },
    ],
  });
  console.log(books);
}

main();
