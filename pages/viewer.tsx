import * as THREE from "three";
import React, { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import Container from "components/Container";
import { NextPage } from "next";
import { useGLTF, MeshReflectorMaterial, Environment, Stage, PresentationControls } from "@react-three/drei";

const Viewer: NextPage = () => {
  return (
    <Container style={{ height: `calc(100vh - 56px - 48px)`, maxWidth: "100%" }}>
      {/* <Canvas camera={{ fov: 45 }} dpr={[1, 2]} shadows></Canvas> */}
    </Container>
  );
};

export default Viewer;
