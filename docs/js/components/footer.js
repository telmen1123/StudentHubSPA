
export function mountFooter(root) {
    if (!root) return;
  
    const currentYear = new Date().getFullYear();
  
    const socialLinks = [
      {
        name: "Facebook",
        icon: "facebook-f",
        url: "https://www.facebook.com/telmen.177671"
      },
      {
        name: "Instagram",
        icon: "instagram",
        url: "https://www.instagram.com/telmenn_____/"
      },
      {
        name: "Gmail",
        icon: "envelope",
        url: "mailto:telmenbatulzii29@gmail.com"
      },
      {
        name: "GitHub",
        icon: "github",
        url: "https://github.com/telmen1123"
      }
    ];
  
    const socialHTML = socialLinks.map((social) => `
      <a
        href="${social.url}"
        class="social-icon"
        ${social.name !== "Gmail"
          ? 'target="_blank" rel="noopener noreferrer"'
          : ""}
        aria-label="${social.name}"
        title="${social.name}"
      >
        <i class="${
          social.name === "Gmail" ? "fas" : "fab"
        } fa-${social.icon}"></i>
      </a>
    `).join("");
  
    root.innerHTML = `
      <footer class="student-footer">
        <div class="container">
  
          <div class="footer-content">
  
            <div class="footer-about">
              <p class="footer-brand">StudentHub</p>
  
              <p class="footer-description">
                Оюутны хичээлийн удирдлагын систем
              </p>
  
              <div class="footer-social">
                ${socialHTML}
              </div>
            </div>
  
          </div>
  
          <div class="footer-bottom">
            <p>
              © ${currentYear} StudentHub.
              Сургалтын зориулалттай төсөл.
            </p>
          </div>
  
        </div>
      </footer>
    `;
  }
  