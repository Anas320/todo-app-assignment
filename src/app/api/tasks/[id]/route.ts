import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id } = params;

  try {
    const deletedTask = await prisma.task.delete({
      where: { id: Number(id) },
    });
    return new Response(JSON.stringify(deletedTask), { status: 200 });
  } catch (error) {
    console.error("Error deleting task:", error);
    return new Response(JSON.stringify({ error: "Task not found" }), {
      status: 404,
    });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id } = params;

  try {
    const task = await prisma.task.findUnique({
      where: { id: Number(id) },
    });

    if (!task) {
      return new Response(JSON.stringify({ error: "Task not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(task), { status: 200 });
  } catch (error) {
    console.error("Error fetching task:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
): Promise<Response> {
  const { id } = params;

  try {
    // Extract the title, color, and completed from the request body
    const { title, color, completed } = await req.json();

    console.log("Updating task with data:", { title, color, completed });

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,    
        color,    
        completed, 
      },
    });

    return new Response(JSON.stringify(updatedTask), { status: 200 });
  } catch (error) {
    console.error("Error updating task:", error);
    return new Response(JSON.stringify({ error: "Failed to update task" }), {
      status: 500,
    });
  }
}
