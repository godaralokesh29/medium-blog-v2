import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { use } from "hono/jsx";
import { verify } from "hono/jwt";

export const bookRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: Number;
  };
}>();



//this is middleware that will run before every route in this router
//it will check if the user is authenticated and if not it will return a 401 error
bookRouter.use("/*",async (c, next) => {
  //this will get the userId from the token and set it in the context
  //and will pass it to the below routes
  const jwt = c.req.header("Authorization");
 try{ if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const user = await verify(jwt, c.env.JWT_SECRET);
  if (!user) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }

  
  // @ts-ignore
  c.set("userId", user.id);
  await next();}catch(e){
	c.status(401);
	return c.json({ error: "you are not logged in" });
  }
});

bookRouter.post("/", async (c) => {
  const body = await c.req.json();
  const authorId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
	  // @ts-ignore
      authorId: Number(authorId),
    },
  });

  return c.json({
    id: blog.id,
  });
});

bookRouter.put("/", async (c) => {
  const body = await c.req.json();
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog.id,
  });
});

bookRouter.get("/bulk", async (c) => {
	const prisma = new PrismaClient({
	  datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
  
	const posts = await prisma.post.findMany({
    select:{
      content:true,
      title:true,
      id:true,
      author:{
        select:{
          name:true
        }
      }
    }
  });
  
	return c.json({
	  posts: posts, 
	});
  });


bookRouter.get('/:id', async (c) => {
	const id  = await c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.findFirst({
      where: {
		//@ts-ignore
        id:Number(id),
      },
      select:{
        id:true,
        title:true,
        content:true,
        author:{
          select:{
            name:true}
        }
      }
    });

    return c.json({
      post: post,
    });
  } catch (e) {
    c.status(404);
    return c.json({ error: "post not found" });
  }
});
//add pagination to this route

