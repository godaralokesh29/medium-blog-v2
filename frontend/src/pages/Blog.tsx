import { useBlog } from "../Hooks"


export const Blog=()=>{
    const {loading, blog} = useBlog({id:"1"})
    if(loading){
        return <div>Loading...</div>
    }

    return <div>
        this is Blog page
    </div>
}