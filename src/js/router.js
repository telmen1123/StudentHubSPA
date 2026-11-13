
export function initRouter(routes) {
    const app = document.getElementById("app");
  
    function renderRoute() {
      const path = window.location.hash.slice(1) || "/";
      const route = routes[path] || routes["/404"];
  
      if (!route) return;
  
      if (typeof route === "function") {
        app.innerHTML = route();
      } else {
        app.innerHTML = route.render();
  
        if (typeof route.bind === "function") {
          route.bind();
        }
      }
    }
  
    window.addEventListener("hashchange", renderRoute);
  
    renderRoute();
  }
  