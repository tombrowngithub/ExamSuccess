const blogSection = document.querySelector('.blogs-section')
db.collection("blogs").get().then((blogs) => {

    blogs.forEach(blog => {
        if (blog.id != decodeURI(location.pathname.split("/").pop())) {
            createBlog(blog);
        }
    })
})

function createBlog(blog) {
    let data = blog.data();
    blogSection.innerHTML += ` 
    <div class="blog-card">
       
        <a href="/${blog.id}" >
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 40) + '...'}</h1>
         </a>
         <p class="blog-overview">${data.article.substring(0, 100) + '...'}</p>
    </div>
     <br/>
    `;
}
