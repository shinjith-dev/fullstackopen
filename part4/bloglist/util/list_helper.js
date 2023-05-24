// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs)=>{
    return blogs.length===0 ? 0 : blogs.reduce((prev,curr)=>prev+curr.likes,0)
}

module.exports = {
    dummy,totalLikes
}