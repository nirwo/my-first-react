import React from 'react';

function ContactUs() {
    return (
        <section>
            <h2>Contact Us</h2>
            <form>
                <label>
                    Name:
                    <input type="text" name="name" />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" />
                </label>
                <label>
                    Message:
                    <textarea name="message"></textarea>
                </label>
                <input type="submit" value="Submit" />
            </form>
        </section>
    );
}

export default ContactUs;