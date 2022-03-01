import React from "react"
import ContentLoader from "react-content-loader"

const SinglePageLoader = (props) => (
    <ContentLoader
        speed={2}
        width={100}
        height={400}
        viewBox="0 0 800 400"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        style={{ width: '100%' }}
        {...props}
    >
        <rect x="-30" y="5" rx="0" ry="0" width="100%" height="12" />
        <rect x="1" y="42" rx="0" ry="0" width="142" height="24" />
        <rect x="3" y="80" rx="0" ry="0" width="368" height="7" />
        <rect x="3" y="97" rx="0" ry="0" width="291" height="6" />
        <rect x="3" y="109" rx="0" ry="0" width="291" height="6" />
    </ContentLoader>
)

export default SinglePageLoader