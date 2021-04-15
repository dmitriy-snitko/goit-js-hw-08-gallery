const options = {
  threshold: 0.1,
};

const callback = (entries, observer) => {
  entries.forEach(entrie => {
    if (entrie.isIntersecting) {
      entrie.target.classList.add('gallery__image--loaded');
      // observer.unobserve(entrie.target);
    } else {
      entrie.target.classList.remove('gallery__image--loaded');
    }
  });
}

const observer = new IntersectionObserver(callback, options);

const lazyImages = document.querySelectorAll('img.lazyload');

lazyImages.forEach(img => {
  observer.observe(img);
});