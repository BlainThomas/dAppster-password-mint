

const LoadingSpinner = ({ type = 'light' }) => {
  const colorStyle = (type) =>
    ({
      light: colors.surfaces.layerTwo,
      dark: colors.primary.main
    }[type]);

  return (
    <div
      className={styles.wrapper}
      style={{
        [`--spinnerColor`]: `${colorStyle(type)}`,
      }}
    >
      <div className={styles.spinner} />
    </div>
  );
};
export default LoadingSpinner;
