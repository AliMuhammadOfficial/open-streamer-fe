interface ISource {
  id: number;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}


interface IDestination {
  id: number;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
}

interface IMediaStreamOptions {
  video: boolean | MediaTrackConstraints;
  audio: boolean | MediaTrackConstraints;
}