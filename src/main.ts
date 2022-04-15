import './style.css'


fetchData();

export async function fetchData(): Promise<void> {
  let feed = document.querySelector('.feed')
  if (feed) {
    feed.parentNode!.removeChild(feed);
  }

  const sort = true;
  const order = (<HTMLSelectElement>document.getElementById('order'))!.value
  const page = (<HTMLSelectElement>document.getElementById('page'))!.value;
  const href = 'https://api.github.com/search/issues';
  const requestUrl = `${href}?q=repo:angular/components&sort=${sort}&order=${order}&page=${page + order}`;
  console.log(requestUrl);
  const data = (await fetch(requestUrl)).json()
  const { items: repos } = await data;
  console.log(repos)
  displayItems(repos);
}


export const displayItems: CallableFunction = (githubIssues: any[]) => {
  const charactersDiv = document.createElement('div');
  charactersDiv.className = 'feed';
  document.body.appendChild(charactersDiv)
  githubIssues.forEach((item: any) => {
    let avatar = document.createElement('img');
    avatar.src = item.user.avatar_url
    avatar.onclick = () => {
      console.log(avatar.src)
    }
    charactersDiv.append(avatar);
  })
};

const test = () => {
  console.log('called')
}

const order = document.querySelector('.order');

order?.addEventListener('change', () => fetchData())





