// https://jsonplaceholder.typicode.com/guide/

async function downloadPosts (page = 1) {
  const postsURL = `https://jsonplaceholder.typicode.com/posts?_page=${page}`
  const response = await fetch(postsURL)
  const articles = await response.json()
  return articles
}

async function downloadComments (postId) {
  const commentsURL = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  const response = await fetch(commentsURL)
  const comments = await response.json()
  return comments
}

async function getUserName (userId) {
  const userURL = `https://jsonplaceholder.typicode.com/users/${userId}`
  const response = await fetch(userURL)
  const user = await response.json()
  return user.name
}

function getArticleId (comments) {
  const article = comments.previousElementSibling
  const data = article.dataset
  return data.postId
}

const details = document.getElementsByTagName('details')
for (const detail of details) {
  detail.addEventListener('toggle', async event => {
    if (detail.open) {
      const asides = detail.getElementsByTagName('aside')
      const commentsWereDownloaded = asides.length > 0
      if (!commentsWereDownloaded) {
        const articleId = getArticleId(detail)
        const comments = await downloadComments(articleId)
        console.log(comments)
      }
    }
  })
}

const posts = await downloadPosts(2)
console.log(posts)


function newLine(p) {
	p = p.replace(/(?:\n)/g, "<br>");
	return p;
}

async function fillElements(obj) {
	const objects = obj;
	for (const objective of objects) {
		
    
    const main = document.querySelector("main");
    const article = document.createElement("article");
    article.setAttribute("data-post-id", objective.id);
    main.appendChild(article);
		
    
    const h2 = document.createElement("h2");
		h2.textContent = objective.title;
		article.appendChild(h2);
		
    
		const span = document.createElement("span");
    span.setAttribute("class", "author");
		span.textContent = await getUserName(objective.userId);
		

    const aside = document.createElement("aside");
    aside.textContent = `by `;
		aside.appendChild(span);
		article.appendChild(aside);


    const p = document.createElement("p");
		let body = objective.body;
		p.innerHTML = newLine(body);
		article.appendChild(p);

    const details = document.createElement("details");
		main.appendChild(details);
		

    const summ = document.createElement("summary");
		summ.textContent = "See what our readers had to say...";
		details.appendChild(summ);
	

    const section = document.createElement("section");
		details.appendChild(section);
		

    const header = document.createElement("header");
		section.appendChild(header);
		

    const h3 = document.createElement("h3");
		h3.textContent = "Comments";
		header.appendChild(h3);


		details.addEventListener("toggle", async (event) => {
			if (details.open) {
				const asides = details.getElementsByTagName("aside");
				const commentsDownloaded = asides.length > 0;
				if (!commentsDownloaded) {
					const id = getArticleId(details);
					const comments = await downloadComments(id);
					console.log(comments);


          for (const comment of comments) {
						const asideComment = document.createElement("aside");
						section.appendChild(asideComment);

						const description = document.createElement("p");
						console.log(comment.body);
						description.textContent = comment.body;
						asideComment.appendChild(description);

						const secondP = document.createElement("p");
						const small = document.createElement("small");

						small.textContent = comment.name;
						secondP.appendChild(small);
						asideComment.appendChild(secondP);
            
					}
				}
			}
		});
	}
}
fillElements(posts);