'use strict';

const bodyTheme = document.querySelector('.light-dark');
const btn = document.querySelector('.btn');
let userInput = document.querySelector('.input');
const image = document.querySelector('.profile-ico');
const userName = document.querySelector('.surname');
const userSurname = document.querySelector('.octocat');
const userBio = document.querySelector('.prof-bio');
const joinData = document.querySelector('.join-data');
const userRepos = document.querySelector('.user-repos');
const userFollowers = document.querySelector('.user-followers');
const userFollowings = document.querySelector('.user-followings');
const local = document.querySelector('.local');
const userBlog = document.querySelector('.blog');
const twitter = document.querySelector('.twitter');
const userCompany = document.querySelector('.company');


btn.addEventListener('click', () => {
    // console.log(userInput.value)
    if(userInput.value < 1){
        findGitUsers('sandro21-glitch')
    }else {
        findGitUsers(userInput.value);
    }
});
userInput.addEventListener('keypress', (e) => {
    if(e.keyCode === 13){
        findGitUsers(userInput.value);
    }
})




function findGitUsers(user){
    
    fetch(`https://api.github.com/users/${user}`)
    .then(res => res.json())
    .then(data => importData(data))
    .catch((error) => {
        throw error;
      });

     
    
    //Importing Data
    function importData(data){
        const { login } = data  
        const { name } = data
        const { created_at } = data;
        const { bio } = data;
        const { public_repos } = data;
        const { followers } = data;
        const { following } = data;
        const { location } = data;
        const { twitter_username } = data;
        const { company } = data;
        const { blog } = data;
        const { avatar_url } = data;

        
        const dateFormat = (str) => {
            const year = new Date(Date.parse(str)).getFullYear();
            const day = new Date(Date.parse(str)).getDate();
            const month = new Date(str).toLocaleString('ENG', {month: 'long'});
            // const day = new Date(getDay(day))
            return `Joined ${day} ${month} ${year}`
          }

        //Import to page
        userName.innerHTML = name;
        userSurname.innerHTML = `@${login}`;
        joinData.innerHTML = dateFormat(created_at);
        userBio.innerHTML = bio;
        image.src = avatar_url;
        if(!bio){
            userBio.textContent = 'This profile has no bio';
        }
        userRepos.innerHTML = public_repos;
        userFollowers.innerHTML = followers;
        userFollowings.innerHTML = following;

        local.innerHTML = location;
        if(!location){
            local.textContent = 'Not Available';
        }
        twitter.innerHTML = twitter_username;
        if(!twitter_username){
            twitter.textContent = 'Not Available';
        }
        userCompany.innerHTML = company;
        if(!company){
            userCompany.textContent = 'Not Available';
        }
        userBlog.innerHTML = blog;
        if(!blog){
            userBlog.textContent = 'Not Available';
        }
    }


}




bodyTheme.addEventListener('click', () => {
    const body = document.querySelector("body");
    if(body.classList.contains('dark-theme')){
        body.classList.remove('dark-theme');
        document.getElementById('dark').textContent = 'Dark';
        document.getElementById('dark-img').src = 'assest/icon-moon.svg';
    }else {
        body.classList.add('dark-theme');
        document.getElementById('dark').textContent = 'Light';
        document.getElementById('dark-img').src = 'assest/icon-sun.svg';
    }
});

