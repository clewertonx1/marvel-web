import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={270}
    height={520}
    viewBox="0 0 270 520"
    backgroundColor="#d9d9d9"
    foregroundColor="#c2c2c2"
    {...props}
  >
    <rect x="0" y="11" rx="0" ry="0" width="250" height="250" /> 
    <rect x="0" y="270" rx="0" ry="0" width="100" height="16" /> 
    <rect x="0" y="292" rx="0" ry="0" width="200" height="35" /> 
    <rect x="0" y="335" rx="0" ry="0" width="250" height="130" />
    <rect x="0" y="475" rx="0" ry="0" width="135" height="16" /> 
  </ContentLoader>
)

export default MyLoader