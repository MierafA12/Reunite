import React from "react";
import Header from "../../components/layout/Header";

const NewsPage = () => {
    return (
        <div className="min-h-screen bg-dark text-white">
            <Header />
            <div className="pt-32 max-w-7xl mx-auto px-6">
                <h1 className="text-4xl font-bold">Latest News</h1>
                <p className="mt-4 text-gray-400">
                    Stay updated with the latest success stories and community news.
                </p>
            </div>
        </div>
    );
};

export default NewsPage;
