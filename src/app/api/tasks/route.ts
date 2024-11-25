import prisma from "@/lib/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany();
  return new Response(JSON.stringify(tasks), { status: 200 });
}

export async function POST(req:Request) {
  const newTask = await req.json();
  const task = await prisma.task.create({
    data: newTask,
  });
  return new Response(JSON.stringify(task), { status: 201 });
}



