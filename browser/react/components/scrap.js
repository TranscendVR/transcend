<script id="chair" type="text/html-template">
          <a-entity mixin="chair-part" geometry="height: 1; depth: 0.05; width: 0.05"
                    position="-0.25 0.5 0"></a-entity>
          <a-entity mixin="chair-part" geometry="height: 1; depth: 0.05; width: 0.05"
                    position="0.25 0.5 0"></a-entity>
          <a-entity mixin="chair-part" geometry="height: 0.5; depth: 0.05; width: 0.05"
                    position="-0.25 0.25 0.5"></a-entity>
          <a-entity mixin="chair-part" geometry="height: 0.5; depth: 0.05; width: 0.05"
                    position="0.25 0.25 0.5"></a-entity>
          <a-entity mixin="chair-part" geometry="height: 0.05; depth: 0.05; width: 0.55"
                    position="0 1 0"></a-entity>
          <a-entity mixin="chair-part" geometry="depth: 0.55; height: 0.05; width: 0.55"
                    position="0 0.5 0.25"></a-entity>
        </script>

        <a-entity class="chairs" template="src: #chair" position="-5 0 -13"></a-entity>


<a-mixin id="chair-part" geometry="primitive: box" material="color: brown"></a-mixin>


           <a-entity light="type: point; intensity: 1.00; distance: 25; decay: 2"
          position="0 30 -25"></a-entity>

<a-entity light="type: directional; intensity: 0.4" position="-10 30 -25"></a-entity>
<a-entity light="type: directional; intensity: 0.4" position="10 30 -25"></a-entity>

#f9f7d9