import { NextPage } from "next";
import Container from "components/Container";
import DataRow from "components/DataRow";
import MovePreview from "components/MovePreview";
import MovePreviewHeader from "components/MovePreviewHeader";
import MovePreviewContent from "components/MovePreviewContent";
import MovePreviewData from "components/MovePreviewData";
import MovePreviewImage from "components/MovePreviewImage";
import Typography from "components/Typography";
const Trials: NextPage = () => {
  return (
    <Container className="trials-container">
      <MovePreview to="/trial">
        <MovePreviewHeader>
          <Typography color="gray" gutter uppercase variant="subheading1">
            Trial 1
          </Typography>
          <Typography shadow uppercase variant="h2">
            Basic Midscreen BnB
          </Typography>
        </MovePreviewHeader>
        <MovePreviewContent className="trial-preview-content">
          <MovePreviewImage />
          <MovePreviewData>
            <DataRow label="Starter" value="Light" />
            <DataRow label="Damage" value="846,000" />
            <DataRow label="Position" value="Corner" />
            <DataRow label="Meter Gain" value="1.1" />
            <DataRow label="Difficulty" value="Easy" />
            <DataRow label="Assists" value="Solo" />
          </MovePreviewData>
        </MovePreviewContent>
      </MovePreview>
      <MovePreview to="/trial">
        <MovePreviewHeader>
          <Typography color="gray" gutter uppercase variant="subheading1">
            Trial 2
          </Typography>
          <Typography shadow uppercase variant="h2">
            Full Screen Level 3 Buster Confirm
          </Typography>
        </MovePreviewHeader>
        <MovePreviewContent className="trial-preview-content">
          <MovePreviewImage />
          <MovePreviewData>
            <DataRow label="Starter" value="Light" />
            <DataRow label="Damage" value="846,000" />
            <DataRow label="Position" value="Corner" />
            <DataRow label="Meter Gain" value="1.1" />
            <DataRow label="Difficulty" value="Easy" />
            <DataRow label="Assists" value="Solo" />
          </MovePreviewData>
        </MovePreviewContent>
      </MovePreview>
      <MovePreview to="/trial">
        <MovePreviewHeader>
          <Typography color="gray" gutter uppercase variant="subheading1">
            Trial 3
          </Typography>
          <Typography shadow uppercase variant="h2">
            Full Screen Level 3 Buster Confirm
          </Typography>
        </MovePreviewHeader>
        <MovePreviewContent className="trial-preview-content">
          <MovePreviewImage />
          <MovePreviewData>
            <DataRow label="Starter" value="Light" />
            <DataRow label="Damage" value="846,000" />
            <DataRow label="Position" value="Corner" />
            <DataRow label="Meter Gain" value="1.1" />
            <DataRow label="Difficulty" value="Easy" />
            <DataRow label="Assists" value="Solo" />
          </MovePreviewData>
        </MovePreviewContent>
      </MovePreview>
      <MovePreview to="/trial">
        <MovePreviewHeader>
          <Typography color="gray" gutter uppercase variant="subheading1">
            Trial 4
          </Typography>
          <Typography shadow uppercase variant="h2">
            Full Screen Level 3 Buster Confirm
          </Typography>
        </MovePreviewHeader>
        <MovePreviewContent className="trial-preview-content">
          <MovePreviewImage />
          <MovePreviewData>
            <DataRow label="Starter" value="Light" />
            <DataRow label="Damage" value="846,000" />
            <DataRow label="Position" value="Corner" />
            <DataRow label="Meter Gain" value="1.1" />
            <DataRow label="Difficulty" value="Easy" />
            <DataRow label="Assists" value="Solo" />
          </MovePreviewData>
        </MovePreviewContent>
      </MovePreview>
    </Container>
  );
};

export default Trials;