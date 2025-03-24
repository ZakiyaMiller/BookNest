import React from 'react'

function Popular() {
    return (
        <div>
            <section className="py-8 ">
                <div className="max-w-screen-2xl mx-auto px-4 md:px-20">

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-2 dark:text-gray-200">Categories</h2>
                            <ul className="text-sm space-y-1 dark:text-gray-300">
                                <li>Fiction</li>
                                <li>Combos & Box Sets</li>
                                <li>Non-Fiction</li>
                                <li>Biographies & Memoirs</li>
                                <li>Contemporary Fiction</li>
                                <li>Children’s Books</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Popular Authors</h2>
                            <ul className="text-sm space-y-1">
                                <li>Robin Sharma</li>
                                <li>Colleen Hoover</li>
                                <li>Vex King</li>
                                <li>James Clear</li>
                                <li>Chetan Bhagat</li>
                                <li>Robert Greene</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Our Best Sellers</h2>
                            <ul className="text-sm space-y-1">
                                <li>Atomic Habits</li>
                                <li>It Ends with Us</li>
                                <li>Do Epic Shit</li>
                                <li>The Song of Achilles</li>
                                <li>The 48 Laws of power</li>
                                <li>Can’t Hurt Me</li>
                            </ul>
                        </div>
                        <div >
                            <h2 className="text-xl font-semibold mb-2">Help Center</h2>
                            <ul className="text-sm space-y-1">
                                <li>Contact Us</li>
                                <li>Privacy Policy</li>
                                <li>Terms & Conditions</li>
                                <li>Cancellation, Shipping & Delivery Polices</li>
                                <li>Return & Refund Polices</li>
                                <li>Other Policies</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default Popular;
