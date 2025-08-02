// This script runs when the DOM is fully loaded, ensuring all elements are available.
document.addEventListener('DOMContentLoaded', function() {
    // Defines the case studies with their titles and Pitch URLs.
    const caseStudies = {
        'virtual-sitter': {
            title: 'Case Study: Designing Life-Saving Patient Safety Technology - Yaniv Nord',
            url: 'https://pitch.com/v/virtual-sitter-case-study-72a4w4'
        },
        'everplans': {
            title: 'Everplans Case Study - Yaniv Nord',
            url: 'https://pitch.com/v/everplans-case-study-uhx5g7'
        }
    };

    // Get the case study name from the URL query string (e.g., ?name=virtual-sitter).
    const params = new URLSearchParams(window.location.search);
    const caseStudyName = params.get('name');

    // Find the corresponding case study object from the defined list.
    const caseStudy = caseStudies[caseStudyName];

    // If a valid case study is found, update the page title and iframe source.
    if (caseStudy) {
        document.title = caseStudy.title;
        const iframe = document.getElementById('case-study-iframe');
        if (iframe) {
            iframe.src = caseStudy.url;
        }
    }

    // The rest of this script is for resizing the iframe to maintain its aspect ratio.
    const iframeContainer = document.querySelector('.iframe-container');
    const iframeWrapper = document.querySelector('.iframe-wrapper');
    
    // Constants for iframe resizing calculations.
    const FOOTER_HEIGHT = 64; // The fixed height of the Pitch presentation footer.
    const ASPECT_RATIO_W = 16; // The width part of the 16:9 aspect ratio.
    const ASPECT_RATIO_H = 9;  // The height part of the 16:9 aspect ratio.
    const PADDING = 16;        // The padding around the iframe wrapper.

    // This function resizes the iframe to fit the available space while maintaining a 16:9 aspect ratio for the main content.
    function resizeIframe() {
        if (!iframeWrapper || !iframeContainer) return;

        // The available space is the wrapper's dimension minus its padding on both sides.
        const availableWidth = iframeWrapper.clientWidth - (PADDING * 2);
        const availableHeight = iframeWrapper.clientHeight - (PADDING * 2);

        // Calculate the width the iframe's 16:9 section would need to fill the available height.
        const widthFromHeight = (availableHeight - FOOTER_HEIGHT) * (ASPECT_RATIO_W / ASPECT_RATIO_H);

        // The final width is the smaller of the two: the available width, or the width derived from the height.
        let optimalWidth = Math.min(availableWidth, widthFromHeight);

        // Ensure the width is not negative.
        if (optimalWidth < 0) optimalWidth = 0;

        // Calculate the final height based on the chosen width and the fixed footer height.
        const optimalHeight = (optimalWidth * (ASPECT_RATIO_H / ASPECT_RATIO_W)) + FOOTER_HEIGHT;

        // Apply the calculated width and height to the iframe container.
        iframeContainer.style.width = `${optimalWidth}px`;
        iframeContainer.style.height = `${optimalHeight}px`;
    }

    // Resize the iframe when the page first loads.
    resizeIframe();
    // Add an event listener to resize the iframe whenever the window is resized.
    window.addEventListener('resize', resizeIframe);
});