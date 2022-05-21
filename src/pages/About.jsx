import React from 'react'

function About() {
    return (
        <div className="hero text-center hero-content flex-col">
            <h1 className="text-6xl mb-4 text-accent-content ">
                Github Finder
            </h1>
            <p className="mb-4 text-2xl font-light max-w-xl text-justify">
                A React app to search GitHub profiles and see profile details.
                This project is part of the
                <a href="https://www.udemy.com/course/modern-react-front-to-back/">
                    {' '}
                    React Front To Back
                </a>{' '}
                Udemy course by
                <strong>
                    <a href="https://traversymedia.com"> Brad Traversy</a>
                </strong>
                .
            </p>
            <p className="text-lg text-neutral-content text-center">
                Version <span className="">1.0.0</span>
            </p>
        </div>
    )
}

export default About
