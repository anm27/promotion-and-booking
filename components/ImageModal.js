import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import Modal from "react-native-modal";
import ImageViewer from "react-native-image-zoom-viewer"; // Import ImageViewer from react-native-image-zoom-viewer
import tw from "twrnc";
import { Ionicons } from "@expo/vector-icons";

const ImageModal = ({ visible, onClose, imageUrl }) => {
  const imgFullUrl =
    "https://www.wbhidcoltd.com/upload_file/newsroom/" + imageUrl;

  return (
    <Modal isVisible={visible} onBackdropPress={onClose}>
      <View style={tw`flex-1`}>
        <TouchableOpacity
          style={tw`absolute top-5 bg-gray-300 rounded-full p-1 right-5 z-999`}
          onPress={onClose}
        >
          <Ionicons name="close-outline" size={24} color="black" />
        </TouchableOpacity>
        <ImageViewer
          imageUrls={[
            {
              url: imgFullUrl,
              // You can provide additional props for the image here
            },
          ]}
          enableSwipeDown={true}
          onSwipeDown={onClose}
          enableImageZoom={true} // Enable image zooming
          backgroundColor="transparent"
          renderIndicator={() => null}
          renderImage={(props) => (
            <Image
              {...props}
              style={{
                width: "100%",
                height: "100%",
                resizeMode: "contain",
              }}
            />
          )}
        />
      </View>
    </Modal>
  );
};

export default ImageModal;
