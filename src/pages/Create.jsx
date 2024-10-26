import { useState } from 'react';
import { Input, Button, Card, CardBody, CardHeader, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, RadioGroup, Radio } from "@nextui-org/react";
import { ThumbsUp, MessageCircle, Share2, Play, Loader2 } from 'lucide-react';
import { Checkbox, Progress, Tabs, Tab } from '@nextui-org/react';
import axios from "axios";

const socialPlatforms = ["reddit", "threads", "twitter"];

const Create = () => {
    const [text, setText] = useState("");
    const [generateCaptions, setGenerateCaptions] = useState(false);
    const [contentOption, setContentOption] = useState('none');
    const [uploadedContent, setUploadedContent] = useState(null);
    const [generatedPosts, setGeneratedPosts] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlatform, setEditingPlatform] = useState("");
    const [editingImage, setEditingImage] = useState("");
    const [editingText, setEditingText] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationProgress, setGenerationProgress] = useState(0);
    const [loadingPlatform, setLoadingPlatform] = useState("");
    const [uploadedContentUrl, setUploadedContentUrl] = useState('');
    const [myPost, setMyPost] = useState({
        text: '',
        image: ''
    });

    const generateAIImageContent = async (platform, text) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/generate_image`, {
                platform, 
                text
            });

            console.log(response)

            // Assuming the API returns the image URL in a field called "imageURL"
            const imageURL = response.data.imageURL || `/api/placeholder/400/300`;
            return imageURL;
        } catch (error) {
            console.error("Error generating AI image content:", error);
            throw new Error("Failed to generate AI image content");
        }
    };


    const generateAICaption = async (platform, text) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/generate_caption`, {
                platform,
                text,
            });

            console.log(response)

            // Assuming the API returns the caption in a field called "caption"
            const caption = response.data.caption || "No caption available.";
            return caption;
        } catch (error) {
            console.error("Error generating AI caption:", error);
            throw new Error("Failed to generate AI caption");
        }
    };

    const generateAIInsights = async (text) => {
        const fleschKincaidScore = calculateFleschKincaid(text);

        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    score: fleschKincaidScore,
                    simplification: "Try shorter sentences and simpler words to boost engagement.",
                    hashtags: ["#ContentCreation", "#SocialMediaTips", "#EngagementBoost"],
                    callToAction: "Share your thoughts in the comments below!",
                });
            }, 1000);
        });
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setGenerationProgress(0);
        setGeneratedPosts({});

        const totalSteps = socialPlatforms.length;
        let completedSteps = 0;

        for (const platform of socialPlatforms) {
            setLoadingPlatform(platform);

            const postContent = {};

            if (generateCaptions === true) {
                const aiGenText = await generateAICaption(platform, text);
                postContent.text = aiGenText;
            }
            else if (generateCaptions === false) {
                postContent.text = text;
            }

            if (contentOption === "none") {
                postContent.image = null
            }
            else if (contentOption === "upload") {
                console.log(uploadedContentUrl)
                postContent.image = uploadedContentUrl;
            } else if (contentOption === "generate") {
                const image = await generateAIImageContent(platform, text);
                postContent.image = image;
            }

            completedSteps++;
            setGenerationProgress((completedSteps / totalSteps) * 100);

            setGeneratedPosts(prev => ({
                ...prev,
                [platform]: postContent
            }));
        }

        setIsGenerating(false);
        setLoadingPlatform("");
    };

    const handleRegeneratePost = async (platform) => {
        setLoadingPlatform(platform);
        setIsGenerating(true);

        const postContent = {};

        if (generateCaptions) {
            const aiGenText = await generateAICaption(platform, text);
            postContent.text = aiGenText;
        } else {
            postContent.text = text;
        }

        if (contentOption === "generate") {
            const image = await generateAIImageContent(platform, text);
            postContent.image = image;
        } else if (contentOption === "upload") {
            postContent.image = uploadedContentUrl;
        }

        setGeneratedPosts(prev => ({
            ...prev,
            [platform]: postContent
        }));

        setIsGenerating(false);
        setLoadingPlatform("");
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadedContent(file);
            // Create a URL for the uploaded file
            const fileUrl = URL.createObjectURL(file);
            setUploadedContentUrl(fileUrl);
            setMyPost(prev => ({
                ...prev,
                image: fileUrl,
            }));
        }
    };

    const openEditModal = (platform) => {
        setEditingPlatform(platform);
        setEditingText(generatedPosts[platform].text);
        setEditingImage(generatedPosts[platform].image || "");
        setIsModalOpen(true);
    };

    function handleCloseEditModal() {
        setEditingPlatform("");
        setEditingText("");
        setEditingImage("");
        setIsModalOpen(false);
    };

    const handleSaveEdit = () => {
        setGeneratedPosts(prev => ({
            ...prev,
            [editingPlatform]: {
                ...prev[editingPlatform],
                text: editingText,
                image: editingImage
            }
        }));
        setIsModalOpen(false);
    };

    const handleTextChange = (e) => {
        const newText = e.target.value;
        setText(newText);
        setMyPost(prev => ({
            ...prev,
            text: newText
        }));
    };

    const handleEditImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setEditingImage(fileUrl);
        }
    };

    function handleRemoveEditImage() {
        setEditingImage("");
    }

    const LoadingOverlay = ({ platform }) => (
        <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] rounded-lg flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin mb-2" />
            <p className="text-sm font-medium">Regenerating content for {platform}...</p>
        </div>
    );

    function syllable(word) {
        // Define vowels
        const vowels = 'aeiouy';
        word = word.toLowerCase().trim();
        let syllableCount = 0;
        let i = 0;

        // Check for consecutive vowels and count syllables
        while (i < word.length) {
            if (vowels.includes(word[i])) {
                // Count only if not preceded by another vowel
                if (i === 0 || !vowels.includes(word[i - 1])) {
                    syllableCount++;
                }
            }
            i++;
        }

        // Adjust for silent 'e' at the end of words
        if (word.endsWith('e')) {
            syllableCount--;
        }

        // Ensure at least one syllable
        if (syllableCount < 1) {
            syllableCount = 1;
        }

        return syllableCount;
    }

    const calculateFleschKincaid = (text) => {
        const sentences = text.split(/[.!?]/).filter(Boolean).length;
        const words = text.split(/\s+/).filter(Boolean).length;
        const syllables = text.split(/\s+/).reduce((total, word) => total + syllable(word), 0);

        if (words === 0 || sentences === 0) {
            return 0; // Avoid division by zero
        }

        const fleschKincaid = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
        return Math.max(0, Math.min(fleschKincaid, 100)); // Keep score between 0 and 100
    };

    const getScoreColor = (score) => {
        if (score >= 60) return "bg-green-100 text-green-600"; // Easy to read, general audience
        if (score >= 30) return "bg-yellow-100 text-yellow-600"; // Moderate readability, suitable for more experienced readers
        return "bg-blue-100 text-blue-600"; // Higher complexity, suitable for specialized or advanced readers
    };

    const InsightBox = ({ aiInsights }) => {
        if (!aiInsights) return null;

        return (
            <div className={`p-3 mt-3 rounded max-w-[350px] ${getScoreColor(aiInsights?.score)}`}>
                <p className="text-sm font-medium">
                    Readability Score: <span className="font-bold">{aiInsights?.score?.toFixed(2)}</span>
                </p>
                <p className="text-xs text-gray-600 mt-1">
                    {aiInsights?.score >= 60
                        ? "This content is easy to read and suitable for a general audience."
                        : aiInsights?.score >= 30
                            ? "This content has moderate readability, ideal for more experienced readers."
                            : "This content is advanced, requiring a higher level of understanding or specialized knowledge."}
                </p>
                <p className="text-sm font-medium mt-2">AI Suggestions:</p>
                <p className="text-xs text-gray-600">{aiInsights?.simplification || "No simplification suggestions."}</p>

                <p className="text-sm font-medium mt-2">Recommended Hashtags:</p>
                <p className="text-xs text-gray-600">{aiInsights?.hashtags?.length ? aiInsights.hashtags.join(" ") : "No hashtags available."}</p>

                <p className="text-sm font-medium mt-2">Suggested Call to Action:</p>
                <p className="text-xs text-gray-600">{aiInsights?.callToAction || "No call to action available."}</p>
            </div>
        );
    };


    const PlatformPost = ({ platform, content, showActions = true, type = "nondemo" }) => {
    const [aiInsights, setAIInsights] = useState(null);
    const [isLoadingInsights, setIsLoadingInsights] = useState(false);
    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isPosting, setIsPosting] = useState(false);

    const loadAIInsights = async () => {
        setIsLoadingInsights(true);
        const insights = await generateAIInsights(content.text);
        setAIInsights(insights);
        setIsLoadingInsights(false);
    };

const handlePost = async () => {
    setIsPosting(true);
    
    const title = content.text.split(" ").slice(0, 5).join(" "); // Use the first 5 words of text as the title
    const subreddit = "u/CalligrapherTrue4170"; // Replace with your actual subreddit or dynamic value
    const mediaUrl = content.image; // Link to image
    const postText = content.text; // Full text content for the post

    console.log(title)
    console.log(subreddit)
    console.log(mediaUrl)
    console.log(postText)

    try {
        const response = await axios.post('http://localhost:3001/api/reddit/post', {
            subreddit: subreddit,
            title: title,
            text: postText,
            mediaUrl: mediaUrl,
        });

        console.log(`Posted to ${subreddit}:`, response.data);
        setIsPostModalOpen(false);
        
        // Optional: Add success notification here
    } catch (error) {
        console.error(`Error posting to ${subreddit}:`, error);
        
        // Optional: Add error notification here
    } finally {
        setIsPosting(false);
    }
};

        const PostContent = () => (
            <>
                <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
                    <div>
                        <p className="font-semibold">John Doe</p>
                        <p className="text-xs text-gray-500">1d ago</p>
                    </div>
                </div>
                <p className="mb-3 text-sm">{content.text}</p>
                {content.image && (
                    <img src={content.image} alt="Post" className="w-full rounded object-cover h-64 mb-3" />
                )}
                <div className="flex justify-between text-gray-500 text-xs mt-3">
                    <ThumbsUp size={14} />
                    <MessageCircle size={14} />
                    <Share2 size={14} />
                </div>
            </>
        );


        return (
        <>
            <Card className="w-full">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">{platform}</p>
                    <small className="text-default-500">Preview</small>
                </CardHeader>
                <CardBody className="overflow-visible py-2 relative">
                    <div className="flex flex-col h-full">
                        <div className="flex-grow">
                            <PostContent />
                        </div>
                        {type === "nondemo" && (
                            <>
                                <InsightBox aiInsights={aiInsights} />
                                {!aiInsights && !isLoadingInsights && (
                                    <Button
                                        size="sm"
                                        color="primary"
                                        variant="flat"
                                        onClick={loadAIInsights}
                                        className="mt-3"
                                    >
                                        Get AI Insights
                                    </Button>
                                )}
                                {isLoadingInsights && (
                                    <div className="flex items-center justify-center mt-3">
                                        <Loader2 className="w-6 h-6 animate-spin mr-2" />
                                        <span>Loading AI Insights...</span>
                                    </div>
                                )}
                            </>
                        )}

                        {type && type === "nondemo" && showActions && (
                            <div className="flex justify-around mt-4 space-x-2">
                                <Button
                                    size="sm"
                                    color="primary"
                                    variant="flat"
                                    onClick={() => handleRegeneratePost(platform)}
                                    isDisabled={isGenerating}
                                >
                                    Regenerate
                                </Button>
                                <Button
                                    size="sm"
                                    color="secondary"
                                    variant="flat"
                                    onClick={() => openEditModal(platform)}
                                    isDisabled={isGenerating}
                                >
                                    Edit
                                </Button>
                                <Button 
                                    size="sm" 
                                    color="success" 
                                    isDisabled={isGenerating}
                                    onClick={() => setIsPostModalOpen(true)}
                                >
                                    Post
                                </Button>
                            </div>
                        )
                        }
                    </div>
                    {isGenerating && loadingPlatform === platform && (
                        <LoadingOverlay platform={platform} />
                    )}
                </CardBody>
            </Card>

                        <Modal 
                isOpen={isPostModalOpen} 
                onClose={() => setIsPostModalOpen(false)}
                size="lg"
            >
                <ModalContent>
                    <ModalHeader>Confirm Post to {platform}</ModalHeader>
                    <ModalBody>
                        <p className="text-sm text-gray-600 mb-4">
                            Please review your post before publishing to {platform}:
                        </p>
                        <Card>
                            <CardBody>
                                <PostContent />
                            </CardBody>
                        </Card>
                    </ModalBody>
                    <ModalFooter>
                        <Button 
                            color="danger" 
                            variant="light" 
                            onPress={() => setIsPostModalOpen(false)}
                            isDisabled={isPosting}
                        >
                            Cancel
                        </Button>
                        <Button 
                            color="success" 
                            onPress={handlePost}
                            isLoading={isPosting}
                        >
                            {isPosting ? "Posting..." : "Confirm Post"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
</>
        );
    };

    return (<>
        <div className="container mx-auto p-4 max-w-7xl grid grid-cols-2 gap-x-12">
            <div className="space-y-3">
                <h1 className="text-xl font-bold mb-4">Create Post</h1>
                <Card>
                    <CardBody>
                        <p className="mb-4">
                            This tool takes your input and generates optimized post versions for different social media platforms.
                        </p>
                        <Input
                            type="text"
                            value={text}
                            onChange={handleTextChange}
                            className="mb-4"
                            label="Enter your text"
                            placeholder="What's on your mind?"
                            isDisabled={isGenerating}
                        />
                        <Checkbox
                            isSelected={generateCaptions}
                            onValueChange={setGenerateCaptions}
                            className="mb-4"
                        >
                            Generate AI caption variants
                        </Checkbox>
                        <Tabs
                            aria-label="Content options"
                            selectedKey={contentOption}
                            onSelectionChange={setContentOption}
                            className="mb-4"
                        >
                            <Tab key="none" title="No Image" />
                            <Tab key="generate" title="Generate AI Image" />
                        </Tabs>
                        {contentOption === 'upload' && (
                            <Input
                                type="file"
                                onChange={handleFileUpload}
                                className="mb-4"
                                label="Upload your content"
                                isDisabled={isGenerating}
                            />
                        )}

                        {isGenerating ? (
                            <div className="space-y-2">
                                <Progress
                                    size="md"
                                    value={generationProgress}
                                    color="primary"
                                    showValueLabel={true}
                                    className="max-w-md"
                                />
                                <p className="text-sm text-gray-600">
                                    Generating content for {loadingPlatform}...
                                </p>
                            </div>
                        ) : (
                            <Button
                                color="primary"
                                onClick={handleGenerate}
                                isDisabled={!text.trim()}
                            >
                                Generate Posts
                            </Button>
                        )}
                    </CardBody>
                </Card>
            </div>
            <div className="space-y-3">
                <h2 className="text-xl font-bold mb-4">Post Preview</h2>
                <PlatformPost type={"demo"} content={myPost} />
            </div>
            <br />
            <br />
        </div>
        <div>
        {Object.keys(generatedPosts).length > 0 && (
            <div className="max-w-7xl mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(generatedPosts).map(([platform, content]) => (
                        <PlatformPost key={platform} platform={platform} content={content} />
                    ))}
                </div>
            </div>
        )}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                size="lg"
            >
                <ModalContent>
                    <ModalHeader>Edit {editingPlatform} Post</ModalHeader>
                    <ModalBody>
                        <Input
                            type="text"
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            label="Edit post text"
                            placeholder="Enter your text"
                            className="mb-4"
                        />
                        {editingImage && (
                            <img src={editingImage} alt="Current post image" className="w-full mb-4 rounded" />
                        )}
                        {editingImage && (
                            <Button color="danger" variant="light" onPress={handleRemoveEditImage}>
                                Remove Image
                            </Button>
                        )}
                        <Input
                            type="file"
                            onChange={handleEditImageUpload}
                            label="Change image"
                            accept="image/*"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={handleCloseEditModal}>
                            Cancel
                        </Button>
                        <Button color="primary" onPress={handleSaveEdit}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    </>
    );
};

export default Create;