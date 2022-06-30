export type Page = "overview" | "moves" | "move" | "assists" | "assist" | "trials" | "trial";

interface MetadataResponse {
  title: string;
  description: string;
  imgUrl: string;
  imgAlt: string;
}

type Metadata = {
  (name: string, cid: string, move?: string, mid?: string): MetadataResponse;
};

const metadata: { [k in Page]: Metadata } = {
  overview: (name, cid) => ({
    title: `${name} / Overview / Plinker`,
    description: `Explore ${name}'s stats, playstyles and best team compositions in Ultimate Marvel vs. Capcom 3.`,
    imgUrl: `${process.env.NEXT_PUBLIC_HOST}/images/portraits/thumbnails_${cid}.webp`,
    imgAlt: `A portrait of ${name}`,
  }),
  moves: (name, cid) => ({
    title: `${name} / Moves / Plinker`,
    description: `Frame data and details for ${name}'s movelist.`,
    imgUrl: `${process.env.NEXT_PUBLIC_HOST}/images/portraits/thumbnails_${cid}.webp`,
    imgAlt: `A portrait of ${name}`,
  }),
  move: (name, cid, move, mid) => ({
    title: `${name} / ${move} / Plinker`,
    description: `Frame data and details for ${name}'s ${move}.`,
    imgUrl: `${process.env.NEXT_PUBLIC_HOST}/images/${cid}/moves/${mid}.jpg`,
    imgAlt: `${name} performing ${move}`,
  }),
  assists: (name, cid) => ({
    title: `${name} / Assists / Plinker`,
    description: `Frame data and details for ${name}'s assists.`,
    imgUrl: `${process.env.NEXT_PUBLIC_HOST}/images/portraits/thumbnails_${cid}.webp`,
    imgAlt: `A portrait of ${name}`,
  }),
  assist: (name, cid, move, mid) => ({
    title: `${name} / ${move} / Plinker`,
    description: `Frame data and details for ${name}'s ${move} assist.`,
    imgUrl: `${process.env.NEXT_PUBLIC_HOST}/images/${cid}/assists/${mid}.jpg`,
    imgAlt: `${name} being called as an assist performing ${move}`,
  }),
  trials: (name, cid) => ({
    title: `${name} / Trials / Plinker`,
    description: `Get a handle of ${name}'s execution through 10 guided combo trials.`,
    imgUrl: `${process.env.NEXT_PUBLIC_HOST}/images/portraits/thumbnails_${cid}.webp`,
    imgAlt: `A portrait of ${name}`,
  }),
  trial: (name, cid, title) => ({
    title: `${name} / ${title} / Plinker`,
    description: `Input notation and details for ${name}'s ${title} trial.`,
    imgUrl: `${process.env.NEXT_PUBLIC_HOST}/images/portraits/thumbnails_${cid}.webp`,
    imgAlt: `A portrait of ${name}`,
  }),
};

export default metadata;
