window.addEventListener("DOMContentLoaded", () => {
    const app = new App(".devtool-wrapper");
});

class App {
    constructor(qs) {
        this.el = document.querySelector(qs); // 指向 #wrapper
        this.page = 1;

        this.el?.addEventListener("click", this.viewPage.bind(this));
    }
    
    setPage(number) {
        const nav = document.querySelector("[data-nav]");

        // 移除旧动画，触发重新重绘以应用新动画
        nav?.classList.remove(`nav--tilt${this.page}`);
        void nav.offsetWidth; 
        
        this.page = number;
        nav?.classList.add(`nav--tilt${this.page}`);

        // 核心逻辑：如果点击的是 "Discover" (索引2)，则展开容器
        if (this.page === 2) {
            this.el.classList.add("is-expanded");
        } else {
            this.el.classList.remove("is-expanded");
        }
    }

    viewPage(e) {
        e.preventDefault();
        
        // 向上冒泡寻找按钮
        let parent = e.target;
        while (parent && !parent.hasAttribute("data-nav-item")) {
            parent = parent.parentElement;
        }

        if (parent) {
            const pageNumber = +parent.getAttribute("data-nav-item");

            if (pageNumber !== this.page) {
                this.setPage(pageNumber);

                // 更新当前活动项的 ARIA 属性和颜色状态
                const items = document.querySelectorAll("[data-nav-item]");
                Array.from(items).forEach(item => {
                    item.removeAttribute("aria-describedby");
                }); 
                parent.setAttribute("aria-describedby", "current");
            }
        }
    }
}
