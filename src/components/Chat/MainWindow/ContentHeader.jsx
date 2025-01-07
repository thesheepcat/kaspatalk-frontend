
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useState } from "react";
import { GeneralContextProvider } from "../../ContextProviders/GeneralContextProvider.jsx";
import { toSvg } from "jdenticon";
import Box from "@mui/material/Box";
import {Image} from "@mui/icons-material";
import {ImageListItem, Typography} from "@mui/material";
import {
    ContentHeaderContainerBoxStyle,
    DetailsContainerBoxStyle,
    DetailsSpanContainerTypographyStyle,
    DetailsTitleContainerTypographyStyle,
    IconsContainerBoxStyle,
    ImageContainerBoxStyle,
    ImageContainerImageStyle
} from "./ContentHeader.styles.js";

const ContentHeader = () => {
    const { selectedPeer } = useContext(GeneralContextProvider);
    const [ peerImage, setPeerImage] = useState();
    
    // Dynamically create peer image
    useEffect(() => {
        const imageFromSelectedPeerName = toSvg(selectedPeer, 100);
        //console.log(imageFromSelectedPeerName);
        const encodedSvg = encodeURIComponent(imageFromSelectedPeerName);
        const imageDataUrl = `data:image/svg+xml;charset=UTF-8,${encodedSvg}`;
        setPeerImage(imageDataUrl);
    }, [selectedPeer])

    return(
        <Box className={"styles.contentHeader"}
             sx={ContentHeaderContainerBoxStyle}>
                <Box className={"image"}
                    sx={ImageContainerBoxStyle}>
                    <ImageListItem
                        sx={ImageContainerImageStyle}>
                        <img src={peerImage} alt="peerImage" />
                    </ImageListItem>

                </Box>
                <Box className= {"styles.details"}
                    sx={DetailsContainerBoxStyle}>
                    <Typography component={"span"}
                                sx={DetailsTitleContainerTypographyStyle}
                                className={"styles.detailsTitle"}>{selectedPeer}</Typography>
                    <Typography component={"span"}
                                sx={DetailsSpanContainerTypographyStyle}
                                className={"styles.detailsSpan"}>last seen 10 minutes ago</Typography>
                </Box>
                <Box className={"styles.icons"}
                     sx={IconsContainerBoxStyle}>
                    <FontAwesomeIcon icon={faSearch} className={"styles.toggleButtonIcon"} />
                    <FontAwesomeIcon icon={faEllipsisV} className={"styles.toggleButtonIcon"} />
                </Box>
        </Box>
    )
}

export default ContentHeader