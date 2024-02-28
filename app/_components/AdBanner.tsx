import React, { useEffect } from 'react'

function AdBanner({props}:any) {
    useEffect(() => {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (err) {
          console.log(err);
        }
      }, []);
    
      return (
        <ins
          className="adsbygoogle adbanner-customize"
          style={{
            display: 'block',
            overflow: 'hidden',
          }}
          data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
          {...props}
        />
      );
    
}

export default AdBanner