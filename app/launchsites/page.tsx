// const launchsites = 
//import Launchsites from "public/launchshites_20230604.json"
import React from "react";
import Launchsites from "../../public/launchsites_20230606_short.json";

export default function Launchsite() {

  const getInitials = (launchsiteName: string) => {
    const nameArray = launchsiteName.split(" ");
    const initials = nameArray.reduce((inits, name) => {
      return inits += name.charAt(0);
    }, "");
    return initials;
  };

  const getLatestDate = () => {
    const firstDate = new Date(Launchsites[0].updated_at);
    const latestDate = Launchsites.reduce((lastDate, ls) => {
      const updatedAt = new Date(ls.updated_at);
      return updatedAt > lastDate ? updatedAt : lastDate;
    }, firstDate);
    return latestDate.toDateString();
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Fixed header with search input and quick filtering categories</div>
      <div>Total number of sites listed {Launchsites.length}</div>
      <div>List of sites last updated: { getLatestDate() }</div>
      <div className="launchsites-flexbox">
        {
          Launchsites.map((ls, index) => {
            return (
              <React.Fragment>
                <div className="launchsite-flex-item">
                  <div className="my-2">
                  { ls.logo_url 
                    ? <div className="logo-for-card ">
                        <img src={ls.logo_url} />
                      </div>
                    : <div className="text-center">
                        <div className="logo-placeholder">{getInitials(ls.name)}</div>
                      </div>
                  }
                  </div>
                  <div className="p-2 text-center"><strong>{ls.name}</strong></div>
                  <div className="p-2 text-center">
                    { ls.editor_recommended ? <span className="bg-green-300 border-neutral-300 py-2 px-3 rounded-3xl">recommended</span> : "not recommended"}
                  </div>
                  <div className="ls-tagline py-2">{ls.tagline}</div>
                  <div>
                    <a href={ls.site_url} target="_blank" className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">view site</a>
                  </div>
                </div>
                {
                  index % 10 === 3 ? <div className="launchsite-flex-item">sponsor card</div> : undefined
                }
              </React.Fragment>
            );
          })
        }
      </div>
    </main>
  )
}

// TODO: add typescript for launchsite type
