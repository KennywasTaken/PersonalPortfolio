

const SEARCHBAR = document.getElementById("searchbar");
const APILINK = "https://api.github.com/users/KennywasTaken/repos";

async function getGithubRepos()
{
    try {
        const response = (await fetch(APILINK, {method: "GET"}));

        if (!response.ok)
        {
            throw new Error();
        }

        const data = await response.json()

        const repoTable = data.map(repo => ({
            repoName: repo.name,
            license: repo.license ? repo.license.name : "No License",
            language: repo.language,
            id: repo.id,
            createdAt: repo.created_at,
            archived: repo.archived
        }));

        return repoTable;

    } catch (error) {
        console.error("Error calling API endpoint", error);
        throw error; 
    }
}

async function getProjects(){  
    
    for (let attempt = 0; attempt < 3; attempt++) {
        try
        {
            const repos = await getGithubRepos();
            return repos;
        }
        catch (error)
        {
            console.error(`Attempt ${attempt + 1} failed:`, error);
            if (attempt < 2) { 
                await handleRateExcede();
            }
        }
    }

    await handleRateExcede();
    return null;
}

// Make function to create copy of template project visual 
//return repos

async function handleRateExcede() {
    window.alert("Rate Exceded, Please reload page.")
}

getProjects().then(repos => {

    if (!repos)
    {
        throw new Error;
    }

    repos.forEach(repo => {
        console.log(repo)
    });

}) 

