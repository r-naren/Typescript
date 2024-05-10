// Define the image details in an array
const images: { url: string; caption: string }[] = [
    { url: './images/brinjal.jpg', caption: 'Caption 1' },
    { url: './images/capsicum.jpg', caption: 'Caption 2' },
    { url: './images/carrot.jpg', caption: 'Caption 3' },
    { url: './images/cucumber.jpg', caption: 'Caption 4' },
    { url: './images/facebookelogo.jpg', caption: 'Caption 5' },
    { url: './images/instagram.jpg', caption: 'Caption 6' },
    { url: './images/sea.jpg', caption: 'Caption 7' },
    { url: './images/tomato.jpg', caption: 'Caption 8' },
    { url: './images/tree.jpg', caption: 'Caption 9' },
    { url: './images/waterfall.jpg', caption: 'Caption 10' },
    // Add more image details here
];

const imageContainer = document.getElementById('image-container') as HTMLImageElement;
const captionContainer = document.getElementById('caption-container') as HTMLDivElement;
const prevButton = document.getElementById('prev-button') as HTMLButtonElement;
const nextButton = document.getElementById('next-button') as HTMLButtonElement;

// Set the initial image index
let currentIndex = 0;
// if (imageContainer && captionContainer && prevButton && nextButton) {
// Function to display the current image and caption
function displayImage(index: number) {
    const { url, caption } = images[index];
    imageContainer.src = url;
    captionContainer.textContent = caption;
}

// Display the first image by default
displayImage(currentIndex);

// Event listener for the next button
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    displayImage(currentIndex);
});

// Event listener for the previous button
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    displayImage(currentIndex);
});