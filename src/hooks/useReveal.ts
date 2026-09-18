import { useEffect } from "react";

/**
 * Adds `.is-visible` to every `.reveal` element when it scrolls into view.
 * Supports a stagger delay via `data-reveal-delay` (ms) or --reveal-delay.
 */
export function useReveal() {
  useEffect(() => {
    const revealed = new WeakSet<HTMLElement>();

    const applyReveal = (el: HTMLElement) => {
      const delay = el.dataset.revealDelay;
      if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
      el.classList.add("is-visible");
      el.dataset.revealed = "true";
      revealed.add(el);
    };

    const ensureVisible = (el: HTMLElement) => {
      if (el.dataset.revealed === "true" && !el.classList.contains("is-visible")) {
        el.classList.add("is-visible");
      }
    };

    // Fallback when IntersectionObserver is not available
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll<HTMLElement>(".reveal").forEach(applyReveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            applyReveal(entry.target as HTMLElement);
            // Do not unobserve permanently — keep observing so we can re-ensure
            // if React overwrites className, but we also have MutationObserver
            // as a safety net. Unobserve after reveal to reduce work, but
            // MutationObserver will re-observe if needed.
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    const observeAll = (root: ParentNode = document) => {
      root.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
        if (el.dataset.revealed === "true") {
          ensureVisible(el);
        } else {
          io.observe(el);
        }
      });
    };

    observeAll();

    // Watch for React re-renders that overwrite className and remove is-visible,
    // and for new .reveal elements added dynamically.
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && m.attributeName === "class") {
          const el = m.target as HTMLElement;
          if (el.dataset.revealed === "true") {
            ensureVisible(el);
          } else if (el.classList.contains("reveal")) {
            // New reveal element that hasn't been revealed yet
            if (!revealed.has(el)) io.observe(el);
          }
        } else if (m.type === "childList") {
          m.addedNodes.forEach((node) => {
            if (!(node instanceof HTMLElement)) return;
            if (node.classList.contains("reveal")) {
              if (node.dataset.revealed === "true") ensureVisible(node);
              else io.observe(node);
            }
            node.querySelectorAll?.(".reveal").forEach((desc) => {
              const d = desc as HTMLElement;
              if (d.dataset.revealed === "true") ensureVisible(d);
              else io.observe(d);
            });
          });
        }
      }
    });

    mo.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
