import logo from "../static/img/logo.png";



type Props = {
  top?: number
};

export function Logo({ top = 37 }: Props) {
  return (
    <div id="ndc-logo">
      <img src={logo} style={{ "--top": top+"px" }} />
    </div>
  );
}
