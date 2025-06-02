import { Link } from "react-router-dom"

interface BlogCardProps{
    authorname: string;
    title: string;
    content: string;
    publishedDate: string;
    id: string;
}

export const BlogCard = ({
    authorname,
    title,
    content,
    publishedDate,
    id
}: BlogCardProps) => {
  return ( 
  <Link to={`/blog/${id}`} className="block animate-fade-in">
  <article className="card p-6 mb-6 hover:scale-[1.01] transition-transform duration-200">
    <div className="flex items-center space-x-3 mb-4">
      <Avatar size="small" name={authorname} />
      <div className="flex items-center space-x-2 text-sm text-[var(--muted-foreground)]">
        <span className="font-medium text-[var(--foreground)]">{authorname}</span>
        <Circle />
        <time dateTime={publishedDate}>{publishedDate}</time>
      </div>
    </div>

    <div className="space-y-2">
      <h2 className="text-xl font-bold text-[var(--foreground)] line-clamp-2 hover:text-[var(--primary)] transition-colors duration-200">
        {title}
      </h2>
      <p className="text-[var(--muted-foreground)] line-clamp-3">
        {content}
      </p>
    </div>

    <div className="mt-4 flex items-center justify-between">
      <div className="flex items-center space-x-2 text-sm text-[var(--muted-foreground)]">
        <span>{`${Math.ceil(content.length / 100)} min read`}</span>
        <Circle />
        <button className="hover:text-[var(--primary)] transition-colors duration-200">
          Save
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-[var(--muted)] rounded-full transition-colors duration-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
        <button className="p-2 hover:bg-[var(--muted)] rounded-full transition-colors duration-200">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
    </div>
  </article>
  </Link>
    
  )
}

export function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({ name, size= "small"}: { name: string, size: "small" | "big"}){
    return <div className={`relative inline-flex items-center justify-center 
    overflow-hidden bg-gray-100 rounded-full ${size === "small" ? "w-6 h-6": "w-10 h-10"}`}>
        
        <span className={`font-medium text-gray-600 ${size === "small" ? "text-xs" : "text-lg"}`}>
            {name[0].toUpperCase()}
        </span>
    </div>
    
}