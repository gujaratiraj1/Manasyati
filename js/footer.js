// Footer Component
class FooterComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer class="bg-gray-900 text-white py-16">
                <div class="container mx-auto px-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div>
                            <a href="img_res/LOGO.png" class="h-12 mb-6 block">
                                <img src="img_res/LOGO.png" alt="Manasyati Engineering Services" class="h-full">
                            </a>
                            <p class="text-gray-400 mb-6">
                                Leading MEP design services provider in Hyderabad, bridging the gap between evolving construction needs and consultancy services since May 2024
                            </p>
                            <div class="flex space-x-4">                                <a href="https://www.linkedin.com/in/manasyati-engineering-services-71b89b367/" target="_blank" rel="noopener noreferrer" class="hover:text-primary">
                                    <i class="ri-linkedin-fill text-xl"></i>
                                </a>
                                <a href="#" class="hover:text-primary">
                                    <i class="ri-twitter-fill text-xl"></i>
                                </a>
                                <a href="#" class="hover:text-primary">
                                    <i class="ri-facebook-fill text-xl"></i>
                                </a>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-lg font-bold mb-6">Quick Links</h4>
                            <ul class="space-y-3">
                                <li><a href="About Manasyati Engineering.html" class="text-gray-400 hover:text-white">About Us</a></li>
                                <li><a href="Service Details - Manasyati Engineering.html" class="text-gray-400 hover:text-white">Services</a></li>
                                <li><a href="Projects - Manasyati Engineering Services.html" class="text-gray-400 hover:text-white">Projects</a></li>
                                <li><a href="Industries Manasyati Engineering Services.html" class="text-gray-400 hover:text-white">Industries</a></li>
                                <li><a href="Contact Us - Manasyati Engineering Services.html" class="text-gray-400 hover:text-white">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-lg font-bold mb-6">Services</h4>
                            <ul class="space-y-3">
                                <li><a href="Public Health Engineering Services - Manasyati Engineering.html" class="text-gray-400 hover:text-white">Public Health Engineering</a></li>
                                <li><a href="Fire Safety Engineering Services - Manasyati Engineering.html" class="text-gray-400 hover:text-white">Firefighting Systems</a></li>
                                <li><a href="Life Safety & Security - Manasyati Engineering Services.html" class="text-gray-400 hover:text-white">Life Safety & Security</a></li>
                                <li><a href="Electrical Engineering - Manasyati Engineering Services.html" class="text-gray-400 hover:text-white">Electrical Engineering</a></li>
                                <li><a href="Communication Systems - Manasyati Engineering Services.html" class="text-gray-400 hover:text-white">Communication Systems</a></li>
                                <li><a href="HVAC & IBMS - Manasyati Engineering Services.html" class="text-gray-400 hover:text-white">HVAC & IBMS</a></li>
                                <li><a href="Allied Services - Manasyati Engineering Services.html" class="text-gray-400 hover:text-white">Allied Services</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 class="text-lg font-bold mb-6">Contact Info</h4>
                            <ul class="space-y-3">
                                <li class="flex items-center">
                                    <i class="ri-map-pin-line mr-3"></i>
                                    <span class="text-gray-400">#1-4/CP/218/5/165, Plot NO.165, Central Park Phase II, Kondapur S1. Hyderabad - 500084, India</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="ri-phone-line mr-3"></i>
                                    <span class="text-gray-400">+91 730 688 5392</span>
                                </li>
                                <li class="flex items-center">
                                    <i class="ri-mail-line mr-3"></i>
                                    <span class="text-gray-400">ramana@manasyati.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        <p>&copy; 2024-2025 Manasyati Engineering Services. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        `;
    }
}

// Register the custom element
customElements.define('site-footer', FooterComponent); 