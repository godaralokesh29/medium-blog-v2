import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {

  const {loading, blogs} = useBlogs();

    if (loading){
      return <div>
        <Appbar/>
        <div className="flex justify-center">
          <div>
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          <BlogSkeleton />
          </div>
          
        </div>
      </div>
    }
  

  return (
    <div>
       <Appbar />
      <div  className="flex justify-center">
        <div className="">
        {Array.isArray(blogs) && blogs.map(blog => <BlogCard 
         id={blog.id}
         authorname ={blog.author.name || "lokesh"}
         title={blog.title}
         content={blog.content}
         publishedDate={"23rd June"} />) }
        
       
      </div>
      </div>
    </div>
    
  )
}

