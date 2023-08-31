import { ChangeEvent, useState } from "react"
import { AiFillCamera, AiFillCloseCircle } from "react-icons/ai"

interface Iprops {
    imageUrl: string
}
const MAX_FILE_SIZE = 1024 * 1024 * 2  //Max file size 2MB
const UpdateProfileImage = ({ imageUrl }: Iprops) => {
    const [isImageLoadingFailed, setIsImageLoadingFailed] = useState<boolean>(true)
    const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(null)
    const [imageToRender, setImageToRender] = useState<null | string>(null)
    const handleImageLoadingFailed = () => {
        setIsImageLoadingFailed(false)
    }

    const handleSelectProfileImage = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedImage = event.target.files?.[0] || null
        setSelectedProfileImage(selectedImage)
        console.log(selectedImage)
        if (selectedImage && selectedImage.size > MAX_FILE_SIZE) {
            setSelectedProfileImage(null)
            console.log('Please select a file less than 2MB.')
            return
        }
        const reader = new FileReader();

        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                if (img.width < 128 || img.height < 128) {
                    alert('please select image that have minimum width and height 128px');
                }
            };
            const result = reader.result
            if (typeof result === 'string') {
                img.src = result;
                setImageToRender(result);
            }


        };
        if (selectedImage) {
            reader.readAsDataURL(selectedImage);
        }
    }
    const handleResetProfileImage=()=>{
        setImageToRender(null)
        setSelectedProfileImage(null);
    }

    return (
        <div className="image-container max-w-[128px] h-32 relative bg-gray-100 rounded overflow-hidden border-2 border-customOrange ">
            {
                (imageUrl && !selectedProfileImage) && <img className="w-32 h-32" src={imageUrl} alt="user profile" onError={handleImageLoadingFailed} />
            }
            {
                (isImageLoadingFailed && imageUrl) && <p className="text-center text-sm ">Failed to Load Image</p>
            }
            <label htmlFor="profile-image"><AiFillCamera className="absolute cursor-pointer z-30 text-3xl  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-green-400 rounded-full p-1" /></label>
            <input onChange={handleSelectProfileImage} className="hidden" type="file" name="profile-image" id="profile-image" />
            {imageToRender && <div className="w-32 h-32 absolute top-0 left-0 bg-gray-100 flex justify-center items-center">
                <img src={imageToRender} alt="user selected image" />
                <AiFillCloseCircle onClick={handleResetProfileImage} role="button" className="text-3xl absolute top-0 left-0 text-white bg-red-600 rounded-full p-[2px]" />
            </div>}
        </div>
    )
}

export default UpdateProfileImage