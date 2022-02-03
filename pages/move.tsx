import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Container from "components/Container";
import DataRow from "components/DataRow";
import Typography from "components/Typography";
import StatSection from "components/StatSection";
import StatSectionHeader from "components/StatSectionHeader";
import RadioButtonGroup from "components/RadioButtonGroup";
import RadioButton from "components/RadioButton";
import Image from "next/image";

function formatNumber(value: number, multiplier: number): string {
  const total = value + value * multiplier;
  return total.toLocaleString();
}

const Move: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gohadoken L / Akuma / Plinker</title>
        <meta
          property="og:title"
          content="Akuma - Gohadoken L | Plinker: Frama Data for Ultimate Marvel vs. Capcom 3"
        />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_HOST}/images/moves/akuma-fireball.png`} />
        <meta property="og:description" content="Frame data and details for Akuma's Gohadoken L." />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Akuma performaing Gohadoken L" />
      </Head>
      <Container className="move-container">
        <div className="move-col-1">
          <header className="move-header">
            <Typography shadow uppercase variant="h1">
              Gohadoken L
            </Typography>
            <Typography color="blue" shadow variant="h2">
              236L
            </Typography>
          </header>
          <div className="move-image-container">
            <Image
              alt="Akuma performing Gohadoken L"
              layout="fill"
              src="/images/moves/akuma-fireball.png"
              objectFit="cover"
            />
          </div>
          <div className="move-preview-attributes">
            {["OTG", "Soft Knockdown"].map((a, i) => (
              <span className="move-preview-attributes-item" key={i}>
                {a}
              </span>
            ))}
          </div>
          <div>
            <Typography color="blue" className="bottom-gutter underline" shadow uppercase variant="h3">
              Usage &amp; Details
            </Typography>
            <ul style={{ listStyle: "disc inside", marginTop: 8 }}>
              <li className="typography-body1">Standard mashable standing jab with a smallish hitbox.</li>
              <li className="typography-body1">Serviceable as an anti air in certain situations.</li>
              <li className="typography-body1">Always combo into Level 1 Super.</li>
              <li className="typography-body1">Fixed hitstun.</li>
            </ul>
          </div>
        </div>
        <div>
          <StatSection>
            <StatSectionHeader>Basic Info</StatSectionHeader>
            <DataRow label="Total Hits" value="2" />
            <DataRow label="Block" value="Low" />
            <DataRow label="Hit Type" value="Strike" />
          </StatSection>
          <StatSection>
            <StatSectionHeader>Frame Data</StatSectionHeader>
            <DataRow label="Start Up" value="5" />
            <DataRow label="Active" value="3" />
            <DataRow label="Recovery" value="6" />
            <DataRow label="Block Adv." value="-1" />
            <DataRow label="Hit Adv." value="2" />
          </StatSection>
          <StatefulStatSection>
            {(multiplier, onChange) => (
              <StatSection>
                <StatSectionHeader>Damage & Meter Values</StatSectionHeader>
                <DataRow label="Total Damage" value={formatNumber(5000, multiplier)} />
                <DataRow label="Max Scaled Damage" value={formatNumber(1400, multiplier)} />
                <DataRow label="Damage Per Hit" value={formatNumber(1000, multiplier)} />
                <DataRow label="Meter Gain" value={formatNumber(1000, multiplier)} />
                <DataRow label="Meter Per Hit" value={formatNumber(500, multiplier)} />
                <form style={{ padding: "8px 0" }}>
                  <legend
                    className="bottom-gutter"
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <Typography component="p" uppercase variant="subheading1">
                      Apply X-Factor Multiplier
                    </Typography>
                    <Typography color="blue" component="p" shadow variant="h3">
                      (+{multiplier.toLocaleString("en", { style: "percent" })})
                    </Typography>
                  </legend>
                  <RadioButtonGroup>
                    <RadioButton label="None" checked={multiplier === 0} onChange={onChange} value={0} />
                    <RadioButton label="Level 1" checked={multiplier === 0.3} onChange={onChange} value={0.3} />
                    <RadioButton label="Level 2" checked={multiplier === 0.5} onChange={onChange} value={0.5} />
                    <RadioButton label="Level 3" checked={multiplier === 0.75} onChange={onChange} value={0.75} />
                  </RadioButtonGroup>
                </form>
              </StatSection>
            )}
          </StatefulStatSection>
        </div>
      </Container>
    </>
  );
};

interface StatefulStatSectionProps {
  children: (multiplier: number, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void) => void;
}

function StatefulStatSection(props: StatefulStatSectionProps) {
  const { children } = props;
  const [multiplier, setMultiplier] = useState(0);
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(event.currentTarget.value);
    setMultiplier(value);
  }

  return <>{children(multiplier, onChange)}</>;
}

export default Move;
