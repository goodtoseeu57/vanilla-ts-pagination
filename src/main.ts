import './style.css'

interface User {
    avatar_url: string,
}

interface GithubIssue {
    id: string,
    author_association: string,
    closed_at: string
    comments: number
    comments_url: string
    created_at: Date,
    events_url: string,
    html_url: string
    user: User,
    body: string,
    title: string
}

fetchData();

export async function fetchData() {
    console.log('starting loading')
    let feed = document.querySelector('.feed')
    if (feed) {
        feed.parentNode!.removeChild(feed);
    }

    const sort = true;
    const order = (<HTMLSelectElement>document.getElementById('order'))!.value
    const page = (<HTMLSelectElement>document.getElementById('page'))!.value;
    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + order}`;

    const data = (await fetch(requestUrl)).json()
    const {items: repos} = await data;
    const loadingSpinnerElement = LoadingSpinner('Loading from element')
    document.body.appendChild(loadingSpinnerElement)
    loadingSpinnerElement.remove()
    displayItems(repos);
}

export const LoadingSpinner = (message: string) => {
    console.log(message)
    const loadingSpinner = document.createElement('div')
    loadingSpinner.textContent = message
    return loadingSpinner
}

export const displayItems: CallableFunction = (githubIssues: GithubIssue[]) => {
    const repoCardContainer = document.createElement('div');
    repoCardContainer.className = 'feed';
    document.body.appendChild(repoCardContainer)
    githubIssues.forEach((item: GithubIssue) => {
        const repoCard: HTMLDivElement = document.createElement('div')
        const avatar: HTMLImageElement = document.createElement('img');
        const description: HTMLParagraphElement = document.createElement('p');
        description.textContent = item.title;
        avatar.src = item.user.avatar_url
        repoCard.onclick = () => {
            console.log(item.id)
        }
        repoCard.className = 'repoCard'
        repoCard.append(avatar);
        repoCard.append(description)
        repoCardContainer.append(repoCard)
    })
};


const order = document.querySelector('.order');
order?.addEventListener('change', () => fetchData())

const searchInput = document.getElementById('page');

searchInput?.addEventListener('focusin', () => console.log('focused in'))

searchInput?.addEventListener('focusout', () => console.log('focused out'))






