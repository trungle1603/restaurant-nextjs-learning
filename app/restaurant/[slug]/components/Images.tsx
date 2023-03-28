import Image from "next/image";

export default function Images({ images }: { images: string[] }) {
    const lengthPhotoText = images.length > 1 ? "photos" : "photo";
    return (
        <div>
            <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
                {images.length} {lengthPhotoText}
            </h1>
            <div className="flex flex-wrap">
                {images.map((img, index) => (
                    <Image
                        key={index}
                        className="w-56 h-44 mr-1 mb-1"
                        src={img}
                        alt=""
                        width={752}
                        height={752}
                    />
                ))}

                <Image
                    className="w-56 h-44 mr-1 mb-1"
                    src="https://resizer.otstatic.com/v2/photos/xlarge/3/41701449.jpg"
                    alt=""
                    width={752}
                    height={752}
                />
                <Image
                    className="w-56 h-44 mr-1 mb-1"
                    src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701450.jpg"
                    alt=""
                    width={752}
                    height={752}
                />
                <Image
                    className="w-56 h-44 mr-1 mb-1"
                    src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701452.jpg"
                    alt=""
                    width={752}
                    height={752}
                />
                <Image
                    className="w-56 h-44 mr-1 mb-1"
                    src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701453.jpg"
                    alt=""
                    width={752}
                    height={752}
                />
                <Image
                    className="w-56 h-44 mr-1 mb-1"
                    src="https://resizer.otstatic.com/v2/photos/xlarge/2/41701454.jpg"
                    alt=""
                    width={752}
                    height={752}
                />
            </div>
        </div>
    );
}
