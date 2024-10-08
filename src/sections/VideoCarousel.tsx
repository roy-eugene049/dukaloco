const VideoCarousel = () => {
    return (
      <div className="rounded-3xl overflow-hidden mt-12 max-w-6xl mx-auto px-4  relative">
        <video
          className="w-full h-full object-cover rounded-3xl"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="/src/assets/hph.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  };
  
  export default VideoCarousel;
  