import styles from './styles.module.scss'

const CardSection = () => {
  return (
    <>
      <div>
        <p className={styles._littleTitle}>FRESH N’ HOLY</p>
        <div className={styles._row}>
          <div className={styles._checkParent}>
            <input type='radio' className={styles._radioBtn} defaultChecked={true}></input>
            <p>Veggies</p>
          </div>

          <div className={styles._priceParent}>
            <p>$0.00</p>
          </div>
        </div>

        <div className={styles._row}>
          <div className={styles._checkParent}>
            <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
            <p>Holy Slaw</p>
          </div>

          <div className={styles._priceParent}>
            <p>$0.00</p>
          </div>
        </div>
      </div>

      <div>
        <p className={styles._littleTitle}>HOLY SAUCES</p>
        <div className={styles._row}>
          <div className={styles._checkParent}>
            <input type='radio' className={styles._radioBtn} defaultChecked={true}></input>
            <p>Salsa de la casa</p>
          </div>

          <div className={styles._priceParent}>
            <p>$0.00</p>
          </div>
        </div>

        <div className={styles._row}>
          <div className={styles._checkParent}>
            <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
            <p>BBQ. Morena</p>
          </div>
          <div className={styles._priceParent}>
            <p>$0.00</p>
          </div>
        </div>

        <div className={styles._row}>
          <div className={styles._checkParent}>
            <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
            <p>Alioli de Ajos Rostizados</p>
          </div>

          <div className={styles._priceParent}>
            <p>$0.00</p>
          </div>
        </div>
      </div>

      <div className={styles._cardParent}>
        <div>
          <p className={styles._title}>Extras</p>
        </div>

        <div className={styles._webParent}>

        <div>
          <p className={styles._littleTitleCard}>HOLY BLESSINGS</p>
          <div className={styles._row}>
            <div className={styles._column}>
              <div className={styles._checkParent}>
                <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                <p>Tocineta</p>
              </div>
            </div>

            <div className={styles._column}>
              <div className={styles._numberParent}>
                <div className={styles._circle}>
                  <p>-</p>
                </div>
                <input type='text' value='1' readOnly className={styles._input} ></input>
                <div className={styles._circle}>
                  <p>+</p>
                </div>
              </div>
            </div>

            <div className={styles._column}>
              <div className={styles._priceParent}>
                <p>$0.00</p>
              </div>
            </div>
          </div>

          <div className={styles._row}>
            <div className={styles._column}>
              <div className={styles._checkParent}>
                <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                <p>Queso Cheddar</p>
              </div>
            </div>

            <div className={styles._column}>
              <div className={styles._numberParent}>
                <div className={styles._circle}>
                  <p>-</p>
                </div>
                <input type='text' value='1' readOnly className={styles._input} ></input>
                <div className={styles._circle}>
                  <p>+</p>
                </div>
              </div>
            </div>

            <div className={styles._column}>
              <div className={styles._priceParent}>
                <p>$0.00</p>
              </div>
            </div>
          </div>

          <div className={styles._row}>
            <div className={styles._column}>
              <div className={styles._checkParent}>
                <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                <p>Papas fritas</p>
              </div>
            </div>

            <div className={styles._column}>
              <div className={styles._numberParent}>
                <div className={styles._circle}>
                  <p>-</p>
                </div>
                <input type='text' value='1' readOnly className={styles._input} ></input>
                <div className={styles._circle}>
                  <p>+</p>
                </div>
              </div>
            </div>

            <div className={styles._column}>
              <div className={styles._priceParent}>
                <p>$0.00</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className={styles._littleTitleCard}>HOLY SAUCES</p>
          <div className={styles._row}>
            <div className={styles._column}>
              <div className={styles._checkParent}>
                <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                <p>Salsa de la casa</p>
              </div>
            </div>

            <div className={styles._column}>
              <div className={styles._numberParent}>
                <div className={styles._circle}>
                  <p>-</p>
                </div>
                <input type='text' value='1' readOnly className={styles._input} ></input>
                <div className={styles._circle}>
                  <p>+</p>
                </div>
              </div>
            </div>

            <div className={styles._column}>
              <div className={styles._priceParent}>
                <p>$0.00</p>
              </div>
            </div>
          </div>

          <div className={styles._row}>
            <div className={styles._column}>
              <div className={styles._checkParent}>
                <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                <p>BBQ.morena</p>
              </div>
            </div>

            <div className={styles._column}>
              <div className={styles._numberParent}>
                <div className={styles._circle}>
                  <p>-</p>
                </div>
                <input type='text' value='1' readOnly className={styles._input}></input>
                <div className={styles._circle}>
                  <p>+</p>
                </div>
              </div>
            </div>

            <div className={styles._column}>
              <div className={styles._priceParent}>
                <p>$0.00</p>
              </div>
            </div>
          </div>

          <div className={styles._row}>
            <div className={styles._column}>
              <div className={styles._checkParent}>
                <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                <p>Alioli de Ajos Rostizados</p>
              </div>
            </div>

            <div className={styles._column}>
              <div className={styles._numberParent}>
                <div className={styles._circle}>
                  <p>-</p>
                </div>
                <input type='text' value='1' readOnly className={styles._input}></input>
                <div className={styles._circle}>
                  <p>+</p>
                </div>
              </div>
            </div>

            <div className={styles._column}>
              <div className={styles._priceParent}>
                <p>$0.00</p>
              </div>
            </div>
          </div>
        </div>

        </div>
        {/* RESPONSIVEEEEEEEEEE */}
        <div className={styles._responsiveParent}>
          <p className={styles._littleTitle}>HOLY BLESSINGS</p>
          <div className={styles._responsiveRow}>
            <div className={styles._column}>
              <div className={styles._checkParent}>
                <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                <p>Tocineta</p>
              </div>
            </div>

            <div className={styles._newParent}>
              <div className={styles._column}>
                <div className={styles._numberParentResponsive}>
                  <div className={styles._circle}>
                    <p>-</p>
                  </div>
                  <input type='text' value='1' readOnly className={styles._input}></input>
                  <div className={styles._circle}>
                    <p>+</p>
                  </div>
                </div>
              </div>

              <div className={styles._column}>
                <div className={styles._priceParentReponsive}>
                  <p>$0.00</p>
                </div>
              </div>
            </div>

          </div>
          <div className={styles._responsiveRow}>
            <div className={styles._column}>
              <div className={styles._checkParent}>
                <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                <p>Queso Cheddar</p>
              </div>
            </div>

            <div className={styles._newParent}>
              <div className={styles._column}>
                <div className={styles._numberParentResponsive}>
                  <div className={styles._circle}>
                    <p>-</p>
                  </div>
                  <input type='text' value='1' readOnly className={styles._input}></input>
                  <div className={styles._circle}>
                    <p>+</p>
                  </div>
                </div>
              </div>

              <div className={styles._column}>
                <div className={styles._priceParentReponsive}>
                  <p>$0.00</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles._responsiveRow}>
            <div className={styles._column}>
              <div className={styles._checkParent}>
                <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                <p>Papas fritas</p>
              </div>
            </div>

            <div className={styles._newParent}>
              <div className={styles._column}>
                <div className={styles._numberParentResponsive}>
                  <div className={styles._circle}>
                    <p>-</p>
                  </div>
                  <input type='text' value='1' readOnly className={styles._input}></input>
                  <div className={styles._circle}>
                    <p>+</p>
                  </div>
                </div>
              </div>

              <div className={styles._column}>
                <div className={styles._priceParentReponsive}>
                  <p>$0.00</p>
                </div>
              </div>
            </div>
          </div>

          <p className={styles._littleTitle}>HOLY BLESSINGS</p>
          <div className={styles._responsiveRow}>
            <div className={styles._column}>
              <div className={styles._checkParent}>
                <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                <p>Tocineta</p>
              </div>
            </div>

            <div className={styles._newParent}>
              <div className={styles._column}>
                <div className={styles._numberParentResponsive}>
                  <div className={styles._circle}>
                    <p>-</p>
                  </div>
                  <input type='text' value='1' readOnly className={styles._input}></input>
                  <div className={styles._circle}>
                    <p>+</p>
                  </div>
                </div>
              </div>

              <div className={styles._column}>
                <div className={styles._priceParentReponsive}>
                  <p>$0.00</p>
                </div>
              </div>
            </div>

          </div>
          <div className={styles._responsiveRow}>
            <div className={styles._column}>
              <div className={styles._checkParent}>
                <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                <p>Queso Cheddar</p>
              </div>
            </div>

            <div className={styles._newParent}>
              <div className={styles._column}>
                <div className={styles._numberParentResponsive}>
                  <div className={styles._circle}>
                    <p>-</p>
                  </div>
                  <input type='text' value='1' readOnly className={styles._input}></input>
                  <div className={styles._circle}>
                    <p>+</p>
                  </div>
                </div>
              </div>

              <div className={styles._column}>
                <div className={styles._priceParentReponsive}>
                  <p>$0.00</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles._responsiveRow}>
            <div className={styles._column}>
              <div className={styles._checkParent}>
                <input type='radio' className={styles._radioBtn} defaultChecked={false}></input>
                <p>Papas fritas</p>
              </div>
            </div>

            <div className={styles._newParent}>
              <div className={styles._column}>
                <div className={styles._numberParentResponsive}>
                  <div className={styles._circle}>
                    <p>-</p>
                  </div>
                  <input type='text' value='1' readOnly className={styles._input}></input>
                  <div className={styles._circle}>
                    <p>+</p>
                  </div>
                </div>
              </div>

              <div className={styles._column}>
                <div className={styles._priceParentReponsive}>
                  <p>$0.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardSection
